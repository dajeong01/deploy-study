FROM eclipse-temurin:21-jdk
ARG JAR_FILE=target/*.jar
WORKDIR /app
COPY upload /app/upload
COPY ${JAR_FILE} /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]