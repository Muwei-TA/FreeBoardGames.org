FROM freeboardgames-20261013-common:41a0077 AS common
FROM node:16.14-alpine3.14 AS deps
RUN apk add --no-cache bash
RUN addgroup -g 938 appuser && adduser -h /appdata -S -u 997 -G appuser appuser && rm /bin/su
USER appuser
WORKDIR /appdata
COPY --chown=appuser package.json yarn.lock /appdata/
RUN yarn install --production --frozen-lockfile && yarn cache clean
FROM deps AS runtime
COPY --chown=appuser docker_run.sh /appdata/
COPY --chown=appuser public /appdata/public
COPY --chown=appuser .next /appdata/.next
COPY --chown=appuser server /appdata/server
COPY --chown=appuser --from=common /internal /internal
CMD ["./docker_run.sh"]
