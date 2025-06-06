The error you're seeing:

```arduino
Caused by: java.io.IOException: Cannot run program "docker": error=2, Bestand of map bestaat niet
```

...means that **Spring Boot's Docker Compose integration** is trying to call the docker CLI directly, but it\
can't find the docker binary, because you're using **Podman** instead.

### 🔍 What's Happening?

Spring Boot 3.1+ has built-in support for Docker Compose using the docker CLI. It does not recognize\
Podman by default — especially when using podman.socket or podman-compose.

### ✅ Solutions

#### ✅ Option 1: Install a Docker alias for Podman

If Podman is installed, you can make Spring Boot think Docker is available by symlinking:

```bash
sudo ln -s /usr/bin/podman /usr/local/bin/docker
```

##### ✅ This makes Podman respond to docker commands like docker version, which Spring Boot expects.

Then verify:

```bash
docker version  # ← should return podman info
```

#### ✅ Option 2: Disable Spring Boot's Docker Compose Integration

If you don’t want **Spring Boot** to manage containers automatically during development, disable\
it in your application.yml or application.properties:

```bash
spring:
  docker:
    compose:
      enabled: false
```

#### ✅ Option 3: Use podman-compose externally

Run your services manually with podman-compose before launching the app:

```bash
podman-compose up -d
./mvnw spring-boot:run
```

This way, your app connects to already running services and Spring Boot doesn’t need to touch Docker.

### 🧪 Verify After Fix

- If using the symlink: docker version should return Podman’s output
- If disabling Docker Compose in Spring: Spring won’t try to auto-start containers
- If using podman-compose: ensure your containers are up before launching the app
