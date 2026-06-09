FROM jenkins/jenkins:lts-jdk17

# Skip setup wizard but explicitly instruct Jenkins to use Configuration as Code
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"
ENV CASC_JENKINS_CONFIG="/var/jenkins_home/jenkins.yaml"

# Install all your old favorite plugins + job-dsl for your yaml pipelines
RUN jenkins-plugin-cli --plugins \
    git \
    workflow-aggregator \
    docker-workflow \
    blueocean \
    configuration-as-code \
    job-dsl \
    pipeline-stage-step \
    pipeline-milestone-step

# Add jenkins user to docker group
USER root
RUN groupadd -f docker && usermod -aG docker jenkins

USER jenkins
