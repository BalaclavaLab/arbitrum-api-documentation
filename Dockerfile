FROM ruby:2.4-alpine

# nodejs is a jekyll runtime dependency, because
# github-pages gem depends on jekyll-coffeescript
RUN apk add --update nodejs
RUN apk add --update --virtual .build-deps build-base

WORKDIR /app
COPY Gemfile Gemfile.lock ./

RUN bundle install \
    && apk del --purge .build-deps

COPY . .

EXPOSE 4000
CMD [ "/app/scripts/container/boot.sh" ]
