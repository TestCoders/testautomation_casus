FROM eclipse-temurin:21-jdk-jammy

RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app
RUN mvn clean install -DskipTests

ENTRYPOINT ["mvn", "test"]

