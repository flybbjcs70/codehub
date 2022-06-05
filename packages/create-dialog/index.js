import Vue from 'vue'
import ElementUI from 'element-ui'

export default function factory (name, Component, options) {
    /**
     * @type {import { ComponentOptions }  from "vue";}
     */
    return {
        data() {
            return {
                [name]: {
                    show () {}
                }
            }
        },
    }
}