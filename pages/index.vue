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
            <b-col v-for="(a, idx) in advisors" :key="idx" cols="3">
              <div class="rounded shadow bg-white p-3 h-100 d-flex flex-column">
                <div class="text-center flex-grow-1">
                  <div class="">
                    <div class="mb-3">
                      <img
                        class="h-20 w-20 rounded-circle object-cover"
                        :src="a.imageURL"
                        :alt="a.name"
                      />
                    </div>
                    <h2 class="font-weight-bold h3">
                      {{ a.firstName }} {{ a.lastName }}
                    </h2>
                    <p class="mb-3">{{ a.description }}</p>
                  </div>
                </div>
                <b-button
                  :href="a.buttonURL"
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
  asyncData({ $axios, error }) {
    return $axios
      .$get('api/mentor')
      .then((res) => {
        if (res) {
          console.log(res)
          return {
            mentors: '',
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
      advisors: [
        {
          firstName: 'Jonathan',
          lastName: 'Gorczyca',
          description:
            'Partner / Co-founder at Helm Experience & Design. Product Design, UX, Technology, Startups, Digital Strategy.',
          buttonURL: 'https://calendly.com/jonathan-gorczyca/connect',
          imageURL: 'https://www.openofficetime.com/assets/img/heads/jg.jpg',
          tags: ['ux design', 'product design', 'startups', 'technology'],
        },
        {
          firstName: 'Nicholas',
          lastName: 'Barone',
          description:
            'I have spent my entire career working to increase the number of technology companies and entrepreneurs in Buffalo, NY',
          buttonURL: 'https://calendly.com/nb3004',
          imageURL:
            'https://www.openofficetime.com/assets/img/heads/82311f376f5d8a12.jpg',
          tags: ['entrepreneur', 'startups', 'technology'],
        },
      ],
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
