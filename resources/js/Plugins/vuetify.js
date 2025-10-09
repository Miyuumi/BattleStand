import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Import Vuetify styles
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    // Customize Vuetify theme and settings here if needed
    components,
    directives
})

export default vuetify
