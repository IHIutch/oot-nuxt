<template>
  <div>
    <div class="bg-light py-5">
      <b-container>
        <b-row>
          <b-col class="text-center">
            <div class="mb-5">
              <h1 class="display-2">Open Office Time</h1>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <p class="h2">
              Schedule time with community leaders, mentors, executives, and
              advisors.
            </p>
          </b-col>
          <b-col cols="6">
            <p class="lead mb-4">
              A generous listing of everyone who has open office time available
              in Buffalo, Rochester, Upstate NY, and more! Get advice, feedback,
              or workshop your business ideas.
            </p>
            <div>
              <b-button href="#content" variant="primary" class="mb-2"
                >Search the Listings</b-button
              >
            </div>
            <div>
              <b-button to="/join" variant="link" class="px-0"
                >Add Your Open Office Time</b-button
              >
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="position-relative pt-3">
      <div class="py-4 sticky-top bg-white">
        <b-container>
          <b-row>
            <b-col>
              <b-form-group
                id="content"
                label="Search"
                label-for="search"
                label-class="sr-only"
                class="mb-0"
              >
                <b-form-input
                  id="search"
                  v-model="form.search"
                  type="text"
                  placeholder="Search & filter..."
                  size="lg"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="mb-5 pt-3">
        <b-container>
          <b-row>
            <b-col v-for="(m, idx) in mentors" :key="idx" cols="3">
              <div class="rounded shadow bg-white p-3 h-100 d-flex flex-column">
                <div class="text-center flex-grow-1">
                  <div class="">
                    <div class="mb-3">
                      <img
                        class="h-20 w-20 rounded-circle object-cover"
                        :src="m.imageURL"
                        :alt="m.name"
                      />
                    </div>
                    <h2 class="font-weight-bold h3">
                      {{ m.firstName }} {{ m.lastName }}
                    </h2>
                    <p class="mb-3">{{ m.description }}</p>
                  </div>
                </div>
                <b-button
                  :href="m.buttonURL"
                  target="_blank"
                  no-referrer
                  no-openner
                  >Book Now</b-button
                >
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  asyncData({ $axios, error, $config }) {
    return $axios
      .$get(`${$config.baseURL}/api/mentor`)
      .then((res) => {
        if (res) {
          return {
            mentors: res,
          }
        } else {
          throw new Error(error)
        }
      })
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })
  },
  data() {
    return {
      form: {
        search: '',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.h-20 {
  height: 5rem;
}
.w-20 {
  width: 5rem;
}
.object-cover {
  object-fit: cover;
}
</style>
