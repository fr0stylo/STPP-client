<template>
    <div class="md-layout-item">
        <md-field v-bind:class="{'md-invalid' :  hasError}">
            <label>{{label}}</label>
            <span v-if="dollarSign" class="md-prefix">&euro;</span>
            <md-input :value="value" @input="handleInput"></md-input>

            <span class="md-error">{{errMessage}}</span>
        </md-field>
    </div>
</template>

<script>
    import Vue from 'vue';

    import Automata from '../../../core/fma/fma';

    const STATES = {
        INITIAL: 'initial',
        VAIDATION: 'validation',
        TOUCHED: 'touched',
        ERROR: 'error',
    };


    const input = {
        name: 'TlInput',
        props: ['label', 'value','dollarSign', 'validate'],
        data() {
            const fsa = new Automata({
                key: 'Input',
                initial: STATES.INITIAL,
                states: {
                    [STATES.INITIAL]: {
                        on: {
                            INPUT: STATES.VAIDATION
                        }
                    },
                    [STATES.VAIDATION]: {
                        on: {
                            SUCCESS: STATES.TOUCHED,
                            ERROR: STATES.ERROR,
                            INPUT: STATES.VAIDATION,
                        }
                    },
                    [STATES.TOUCHED]: {
                        on: {
                            INPUT: STATES.VAIDATION
                        }
                    },
                    [STATES.ERROR]: {
                        on: {
                            INPUT: STATES.VAIDATION
                        }
                    },
                },
            });

            return {
                fsa,
                errMessage: '',
            };
        },
        computed: {
            hasError: function () {
                return this.fsa.getCurrentState() === STATES.ERROR;
            }
        },
        watch: {
            value: function (val) {
                const error= this.validate(val);
                if (error) {
                    this.fsa.transition('ERROR');
                    this.errMessage = error;
                } else {
                    this.fsa.transition('SUCCESS');
                }
            }
        },
        methods: {
            handleInput: function(e){
                this.$emit('input', e);
                this.fsa.transition('INPUT');
            }
        }
    };

    export default Vue.component('tl-input', input);
</script>

<style scoped>

</style>
