<template>
  <div>
    <div class="bg-light py-5">
      <b-container>
        <b-row>
          <b-col class="text-center">
            <h1 class="display-2">
              <NuxtLink to="/">Open Office Time</NuxtLink>
            </h1>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="py-5">
      <b-container>
        <b-row>
          <b-col cols="6" offset="3">
            <div>
              <b-form @submit.prevent="onSubmit">
                <b-form-group
                  label="What's your first name?"
                  label-for="firstName"
                  description=""
                >
                  <b-form-input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    placeholder="Type here..."
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label="What's your last name?"
                  label-for="lastName"
                  description=""
                >
                  <b-form-input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    placeholder="Type here..."
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label="How about your email?"
                  label-for="email"
                  description=""
                >
                  <b-form-input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Your work email..."
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label="What city are you in?"
                  label-for="city"
                  description=""
                >
                  <b-form-input
                    id="city"
                    v-model="form.city"
                    type="text"
                    placeholder="eg. Buffalo..."
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label="Give us an overview of your expertise"
                  label-for="description"
                  description="We'll display this overview on your listing. Please keep it short and sweet. (140 characters max.)"
                >
                  <b-form-input
                    id="description"
                    v-model="form.description"
                    type="text"
                    placeholder="Clear and succinct..."
                    maxlength="140"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label="Share your LinkedIn"
                  label-for="linkedinURL"
                  description="Find your profile link by going to your profile and copy / paste the url."
                >
                  <b-form-input
                    id="linkedinURL"
                    v-model="form.linkedinURL"
                    type="url"
                    placeholder="Paste your profile link here..."
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label="Share the link to your booking calendar"
                  label-for="bookingURL"
                  description="Most prefer a Calendly to manage their hours and booking."
                >
                  <b-form-input
                    id="bookingURL"
                    v-model="form.bookingURL"
                    type="url"
                    placeholder="Paste your Calendly link..."
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  v-slot="{ ariaDescribedby }"
                  label="Select the top 3 categories you mentor"
                  description="This will help people to find your profile by category. (Max. 3)"
                >
                  <b-form-checkbox-group
                    id="categories"
                    v-model="form.categories"
                    class="text-capitalize"
                    :options="options"
                    :aria-describedby="ariaDescribedby"
                    name="categories"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>

                <b-form-file
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  @change="onFileChange"
                ></b-form-file>

                <div class="text-center">
                  <b-button class="mt-3" type="submit" variant="primary"
                    >Submit Your Listing</b-button
                  >
                </div>
              </b-form>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinPage',
  data() {
    return {
      options: [
        'ux design',
        'product design',
        'startups',
        'technology',
        'entrepreneur',
      ],
      image: {},
      form: {
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        description: '',
        linkedinURL: '',
        bookingURL: '',
        categories: [],
      },
    }
  },
  methods: {
    async onSubmit() {
      const {
        firstName,
        lastName,
        email,
        city,
        description,
        linkedinURL,
        bookingURL,
        categories,
      } = this.form

      await this.getSignedUrlAndUpload()

      this.$axios
        .$post(`${this.$config.baseURL}/api/mentor`, {
          firstName,
          lastName,
          email,
          city,
          description,
          linkedinURL,
          bookingURL,
          categories,
          imageURL: this.image.path,
        })
        .then((data) => {
          alert(JSON.stringify(data, null, '\t'))
        })
        .catch((err) => {
          throw new Error(err)
        })
    },
    async uploadImage(signedUrl, image) {
      const formData = new FormData()
      Object.keys(signedUrl.fields).forEach((key) => {
        formData.append(key, signedUrl.fields[key])
      })
      formData.append('Content-Type', image.type)
      formData.append('file', image.file)
      return await this.$axios.post('/aws', formData)
    },
    async getSignedUrlAndUpload() {
      try {
        const data = await this.$axios.$get(
          `${this.$config.baseURL}/api/upload`
        )
        this.image.path = `${this.$config.awsURL}/${data.fields.key}`
        return await this.uploadImage(data, this.image)
      } catch (err) {
        throw new Error(err)
      }
    },
    onFileChange(e) {
      const self = this
      const file = [...e.target.files][0]
      const reader = new FileReader()
      reader.onload = (e) => {
        self.image = {
          file,
          type: file.type,
        }
      }
      reader.readAsDataURL(file)
    },
  },
}
</script>
