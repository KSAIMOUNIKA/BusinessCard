# Use an official NGINX image as base
FROM nginx:alpine

# Copy your static files (HTML, CSS, JS) to the NGINX web directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Default command to run nginx
CMD ["nginx", "-g", "daemon off;"]

