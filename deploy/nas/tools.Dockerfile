FROM node:16.14-alpine3.14@sha256:a93230d096610a42310869b16777623fbcacfd593e1b9956324470f760048758
RUN apk add --no-cache autoconf automake file g++ libtool make nasm libpng-dev libc6-compat
