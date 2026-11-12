#Team Members: Joshitha Keetha (G01575681) & Bhuvitha Tummala (G01576792)
#Course: SWE 645
#Purpose: This builds the React frontend application and serves it securely using an Nginx web server.

# Stage 1: Build React App
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the custom Nginx config to fix the 404 router issue
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]