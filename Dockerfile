# Base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the dependencies manager to the root directory
COPY package*.json ./

# Install the dependencies in the project
RUN npm install

# Copy the rest of the project files to the root directory
COPY . .

# Define the starting command for the API
CMD ["npm", "start"]