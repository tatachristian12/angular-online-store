FROM jenkins/jenkins:lts-jdk17

# Skip setup wizard and enable Configuration as Code
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"
ENV CASC_JENKINS_CONFIG="/var/jenkins_home/jenkins.yaml"

# Copy jenkins.yaml into the image
COPY jenkins.yaml /var/jenkins_home/jenkins.yaml

# Install all required plugins
RUN jenkins-plugin-cli --plugins \
    git \
    workflow-aggregator \
    docker-workflow \
    blueocean \
    configuration-as-code \
    job-dsl \
    pipeline-stage-step \
    pipeline-milestone-step

# Switch to root to install the Docker CLI binary safely
USER root
RUN apt-get update && \
    apt-get install -y ca-certificates curl gnupg lsb-release && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg || \
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian bookworm stable" | tee /etc/apt/sources.list.d/docker.list || \
    echo "deb https://download.docker.com/linux/debian bookworm stable" | tee /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y docker-ce-cli

# Switch back to the standard jenkins user
USER jenkins
