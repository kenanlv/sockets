FROM node:18-alpine

# Install git
RUN apk add --no-cache git

# Set the working directory inside the container
WORKDIR /app

# Copy everything from the build context (which should be ./sockets) to /app
COPY . .

# Debugging step to verify contents
RUN ls -la /app

# Verify the src directory and check if config.ts exists
RUN ls -la /app/src

# Move into the sockets directory
WORKDIR /app

# Install dependencies
RUN npm install && npm install -g ts-node typescript nodemon

# Compile TypeScript files
RUN tsc

# Define the entry point
ENTRYPOINT ["sh", "-c"]

# Pass environment variables using exec form, ensuring they are expanded
CMD ["node build/index.js --PORT $PORT --REDIS-HOST $REDIS_HOST --REDIS-PORT $REDIS_PORT --JWT-SECRET $JWT_SECRET --CASSANDRA-SERVERS $CASSANDRA_SERVERS --CASSANDRA-KEYSPACE $CASSANDRA_KEYSPACE"]
