require('dotenv').config();
const express = require('express');
const pathToRegexp = require('path-to-regexp');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');

const app = express();
app.use(express.json());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

// --- Middleware to catch 405 (Method Not Allowed) and 404 (Route Not Found) ---

function methodNotAllowedOrNotFoundHandler(req, res, next) {
  const requestedMethod = req.method.toLowerCase();
  const requestedPath = req.path;

  // Get all routes including their full paths with mount path
  const routes = [];

  function getRoutes(stack, basePath = '') {
    stack.forEach(layer => {
      if (layer.route) {
        // This layer is a route
        const routePath = basePath + layer.route.path;
        routes.push({ path: routePath, methods: layer.route.methods });
      } else if (layer.name === 'router' && layer.handle.stack) {
        // This layer is a router mounted on some path
        const newBasePath = basePath + (layer.regexp.source
          // Extract mounted path from regexp source, hacky but works for simple mounts
          .replace('\\/?', '')
          .replace('(?=\\/|$)', '')
          .replace('^', '')
          .replace('$', '')
          .replace(/\\\//g, '/'));
        getRoutes(layer.handle.stack, newBasePath);
      }
    });
  }

  getRoutes(req.app._router.stack);

  // Find matching routes for the requested path
  const matchedRoutes = routes.filter(({ path }) => {
    const re = pathToRegexp(path, [], { end: true });
    return re.test(requestedPath);
  });

  if (matchedRoutes.length > 0) {
    // Check if method allowed
    const methodAllowed = matchedRoutes.some(({ methods }) => methods[requestedMethod]);
    if (!methodAllowed) {
      return res.status(405).json({
        error: `Method ${req.method} not allowed on ${requestedPath}`,
      });
    }
    // Method allowed, let next middleware handle
    return next();
  }

  // No matching route at all
  return res.status(404).json({ error: 'Route not found' });
}

app.use(methodNotAllowedOrNotFoundHandler);

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Use statusCode if set, else default 500
  const statusCode = err.statusCode || 500;

  // Return JSON error response with message
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
