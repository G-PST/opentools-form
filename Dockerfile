FROM node:21-slim
COPY . /app
RUN npm install --prefix /app

# TODO: Handle $INPUT_BASEURL
CMD npm run --prefix /app build; mv /app/out $GITHUB_WORKSPACE/$INPUT_FORMPATH
