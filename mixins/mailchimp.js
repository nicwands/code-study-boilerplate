import fetchJsonp from 'fetch-jsonp'

export default {
    data() {
        return {
            mailchimpLoading: false,
            mailchimpSuccess: false,
            mailchimpAction: '',
            mailchimpError: '',
            mailchimpToken: ''
        }
    },
    computed: {
        mailchimpActionUrl() {
            const modified = this.mailchimpAction.replace(
                '/post?',
                '/post-json?'
            )
            return `${modified}&`
        },
        mailchimpSubmitted() {
            return this.mailchimpSuccess || this.mailchimpError
        }
    },
    methods: {
        async submitMailchimp(data = {}) {
            const inputData = {
                [data.mailchimpToken]: '',
                ...data
            }

            // serlize form data
            const serialized = Object.entries(data).map(e => {
                return `${encodeURIComponent(e[0])}=${encodeURIComponent(e[1])}`
            })

            // send request
            this.mailchimpError = ''
            this.mailchimpLoading = true
            try {
                const response = await fetchJsonp(
                    this.mailchimpActionUrl + serialized.join('&'),
                    {
                        jsonpCallback: 'c'
                    }
                ).then(r => r.json())

                // handle error or success
                if (
                    response.result == 'success' ||
                    response.msg.includes('already subscribed')
                ) {
                    this.mailchimpSuccess = true
                } else {
                    console.log('got error: ', response)
                    this.mailchimpError = String(response.msg)
                        .split(' - ')
                        .pop()
                }
            } catch (err) {
                this.mailchimpError = 'Something went wrong.'
            }
            this.$emit('mailchimpSubmitted', {
                success: this.mailchimpSuccess,
                errorMessage: this.errorMessage
            })
            this.mailchimpLoading = false
        }
    }
}
