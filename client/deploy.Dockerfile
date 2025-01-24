FROM node:alpine
COPY package.json .
RUN yarn install
# RUN yarn global add typescript
# COPY public /
# COPY src /
# COPY next-env.d.ts /
# COPY next.config.js /
# COPY tsconfig.json /
# RUN yarn install -D
# RUN yarn build
COPY .next /.next
COPY public /public
RUN ls -a
CMD ["yarn", "run", "start"]


