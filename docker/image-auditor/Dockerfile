FROM node:carbon
ADD src /opt/src/
#ADD data /opt/data/
WORKDIR /opt/src/
RUN npm install


ENTRYPOINT ["node", "auditor.js"]
