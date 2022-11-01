import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";

import { clDefaultTemplate } from "cl-polymer-element-helpers/cl-default-template.js";
import { clDefaultStyle } from "cl-polymer-element-helpers/cl-default-style.js";

import { __decorate, query } from "cl-polymer-element-helpers/cl-helpers.js";
import { property, observe, computed } from "@polymer/decorators";

import { FlattenedNodesObserver } from "@polymer/polymer/lib/utils/flattened-nodes-observer.js";

import "@polymer/iron-icon/iron-icon.js";
import "@polymer/paper-tooltip/paper-tooltip.js";

import "cl-polymer-element-helpers/ct-element-style.js";

let clPolymerFormInputContainerTemplate;
let clPolymerFormInputContainerTemplateDefault;
let clPolymerFormInputContainerBase = mixinBehaviors([], PolymerElement);
class clPolymerFormInputContainer extends clPolymerFormInputContainerBase {
    constructor () {
        super();
        this.disabled = false;
        this.focused = false;
        this.extended = false;
        this.hideLabel = false;
        this.errorMessageBelowInput = false;
    }

    connectedCallback () {
        super.connectedCallback();
        this.addEventListener("cl-polymer-form-input-container-show-errors", this.onErrorEvent.bind(this))
    }

    disconnectedCallback () {
        super.disconnectedCallback();
        this.removeEventListener("cl-polymer-form-input-container-show-errors", this.onErrorEvent.bind(this))
    }

    onDisabledChange() {
        this.classList.toggle("disabled", this.disabled)
    }
    
    onFocusedChange() {
        this.classList.toggle("focused", this.focused)
    }
    
    onChildInputFocusin() {
        this.disabled || (this.focused = true)
    }
    
    onChildInputFocusout() {
        this.focused = false
    }
    
    onErrorEvent ( event ) {
        0 < event.detail.errorMessages.length ? (this.errorMessage = event.detail.errorMessages[0].message,
        this.errorMessageAriaRole = event.detail.errorMessages[0].ariaRole) : this.errorMessageAriaRole = this.errorMessage = void 0
    }
    
    focusChildInput() {
        if (this.childInput) {
            let nodes = FlattenedNodesObserver.getFlattenedNodes(this.childInput);
            0 < nodes.length && nodes[0] && nodes[0].focus()
        }
    }
    
    get hideDescription () {
        return this.errorMessageBelowInput && !!this.errorMessage
    }

    get invalid () {
        return !!this.errorMessage
    }

    get shouldShowErrorMessageBelowInput () {
        return this.errorMessageBelowInput && (this.extended || !!this.errorMessage)
    }

    get shouldUseErrorTip () {
        return !this.errorMessageBelowInput
    }

  	static get template() {
    	if (void 0 === clPolymerFormInputContainerTemplate || null === clPolymerFormInputContainerTemplate) {

            let template = document.createElement("template");
            template.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                } 

                :host #labelAndInputContainer.paper-input-container > label,
                :host #labelAndInputContainer.paper-input-container > .paper-input-label {
                    font-family: var(--cl-primary-font-family);;
                    font-weight: 400;
                    -webkit-font-smoothing: var(--cl-primary-font-smoothing);;
                    font-size: 15px;
                    line-height: 24px;
                } 

                :host.disabled #outer {
                    background-color: var(--cl-spec-secondary-background-color);
                } 

                :host.disabled #outer,
                :host.disabled #outer:hover {
                    border-color: var(--cl-container-border-color);
                } 

                :host.focused #outer,
                :host.focused #outer:hover {
                    border-color: var(--cl-focus);
                } 

                :host.focused #label {
                    color: var(--cl-focus);
                } 

                :host([invalid]) #outer,
                :host.invalid #outer,
                :host([invalid]) #outer:hover,
                :host.invalid #outer:hover {
                    border-color: var(--cl-primary-error-color);
                } 

                :host([invalid]) #label,
                :host.invalid #label {
                    color: var(--cl-primary-error-color);
                } 

                :host([warning]) #outer,
                :host.warning #outer,
                :host([warning]) #outer:hover,
                :host.warning #outer:hover {
                    border-color: var(--cl-primary-error-color);
                } 

                :host([warning]) #label,
                :host.warning #label {
                    color: var(--cl-primary-error-color);
                } 

                :host([borderless]) #outer,
                :host.borderless #outer {
                    border: 0;
                } 

                :host([counter]) #outer,
                :host.counter #outer {
                    padding: var(--cl-polymer-form-input-container-padding,0 var(--form-field-horizontal-padding) 11px);
                } 

                #outer:hover {
                    border-color: var(--cl-icon-inactive);
                } 

                #outer {
                    border: var(--cl-polymer-form-input-container-border,var(--cl-container-border));
                    border-radius: var(--cl-container-border-radius);
                    box-sizing: border-box;
                    display: flex;
                    flex: 1 1 auto;
                    flex-direction: column;
                    max-height: var(--cl-polymer-form-input-container-max-height);
                    overflow: hidden;
                    overflow-y: auto;
                    padding: var(--cl-polymer-form-input-container-padding,0 var(--form-field-horizontal-padding) 8px);
                    position: relative;
                } 

                :host([hide-label]) #outer {
                    padding: var(--cl-polymer-form-input-container-padding,0 var(--form-field-horizontal-padding));
                } 

                #child-input {
                    display: var(--cl-polymer-form-input-container-child-input-display);
                    height: var(--cl-polymer-form-input-container-child-input-height);
                    flex-direction: var(--cl-polymer-form-input-container-child-input-flex-direction);
                    align-items: var(--cl-polymer-form-input-container-child-input-align-items);
                } 

                #label {
                    font-family: var(--cl-primary-font-family);;
                    font-weight: 400;
                    -webkit-font-smoothing: var(--cl-primary-font-smoothing);;
                    letter-spacing: 0.011em;
                    font-size: 12px;
                    line-height: 16px;
                    margin-top: calc(20px - var(--cl-font-caption1-baseline-top));
                    color: var(--cl-secondary-text-color);
                    margin-bottom: 3px;
                    position: relative;
                } 

                #label-help-tooltip {
                    display: inline-block;
                    margin-left: 8px;
                    position: absolute;
                    top: -3px;
                    vertical-align: middle;
                } 

                #description > * {
                    font-family: var(--cl-primary-font-family);;
                    font-weight: 400;
                    -webkit-font-smoothing: var(--cl-primary-font-smoothing);;
                    letter-spacing: 0.011em;
                    font-size: 12px;
                    line-height: 16px;
                    display: var(--cl-under-container-message-style-display,block);
                    padding-top: calc(16px - var(--cl-font-caption1-baseline-top));
                    padding-bottom: calc(4px - var(--cl-font-caption1-baseline-top));
                    height: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: var(--cl-secondary-text-color);
                } 

                #error-message {
                    font-family: var(--cl-primary-font-family);;
                    font-weight: 400;
                    -webkit-font-smoothing: var(--cl-primary-font-smoothing);;
                    letter-spacing: 0.011em;
                    font-size: 12px;
                    line-height: 16px;
                    display: var(--cl-under-container-message-style-display,block);
                    padding-top: calc(16px - var(--cl-font-caption1-baseline-top));
                    padding-bottom: calc(4px - var(--cl-font-caption1-baseline-top));
                    height: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: var(--cl-primary-error-color);
                    flex-grow: 0;
                    flex-shrink: 0;
                } 

                #description > *,
                #error-message {
                    height: var(--cl-under-container-message-height,20px);
                } 

            </style>
            <div id="outer">
                <template is="dom-if" if="[[!hideLabel]]">
                    <div id="label" on-tap="focusChildInput" >
                        [[label]]
                        <template is="dom-if" if="[[helpTooltip]]">
                            <div id="label-help-tooltip">
                                <iron-icon id="help-icon" class="help-outline-icon" compact="" icon="icons:help-outline" tabindex="0"></iron-icon>
                                <paper-tooltip for="help-icon" position="top" type="explanatory">
                                    <paper-tooltip-body links="[[helpTooltip.links]]" paragraphs="[[helpTooltip.paragraphs]]"></paper-tooltip-body>
                                </paper-tooltip>
                            </div>
                        </template>
                    </div>
                </template>
                <div id="child-input" on-focusin="onChildInputFocusin" on-focusout="onChildInputFocusout">
                    <slot name="body"></slot>
                </div>
            </div>
            <div id="description" hidden$="[[hideDescription]]">
                <slot name="description"></slot>
            </div>
            <template is="dom-if" if="[[shouldUseErrorTip]]">
                <cl-polymer-form-error-tip-renderer always-visible="[[errorTipAlwaysVisible]]" anchor-selector="#child-input" message="[[errorMessage]]" position="[[errorTipPosition]]"></cl-polymer-form-error-tip-renderer>
            </template>
            <template is="dom-if" if="[[shouldShowErrorMessageBelowInput]]">
                <div id="error-message" role$="[[errorMessageAriaRole]]" >[[errorMessage]]</div>
            </template>
            `;
            template.content.insertBefore(clDefaultStyle().content.cloneNode(true), template.content.firstChild);
            let templateContent = template.content;
            let templateInsertBefore = templateContent.insertBefore;
            let defaultTemplate;
            if (void 0 == clPolymerFormInputContainerTemplateDefault || null == clPolymerFormInputContainerTemplateDefault) {
                defaultTemplate = clDefaultTemplate();
                clPolymerFormInputContainerTemplateDefault = defaultTemplate
            }
            defaultTemplate = clPolymerFormInputContainerTemplateDefault;
            templateInsertBefore.call(templateContent, defaultTemplate.content.cloneNode(true), template.content.firstChild);

            return clPolymerFormInputContainerTemplate = template;
        }

        return clPolymerFormInputContainerTemplate;
  	}
}

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerFormInputContainer.prototype, 
    "label", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormInputContainer.prototype, 
    "disabled", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormInputContainer.prototype, 
    "focused", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormInputContainer.prototype, 
    "helpTooltip", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormInputContainer.prototype, 
    "errorMessage", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormInputContainer.prototype, 
    "errorMessageAriaRole", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormInputContainer.prototype, 
    "extended", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormInputContainer.prototype, 
    "hideLabel", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerFormInputContainer.prototype, 
    "errorMessageBelowInput", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    clPolymerFormInputContainer.prototype, 
    "errorTipAlwaysVisible", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerFormInputContainer.prototype, 
    "errorTipPosition", 
    void 0
);

__decorate(
    [
        property({ type: Boolean }),
        computed("errorMessage", "errorMessageBelowInput")
    ], 
    clPolymerFormInputContainer.prototype, 
    "hideDescription", 
    null
);

__decorate(
    [
        property({ type: Function }),
        observe("disabled")
    ], 
    clPolymerFormInputContainer.prototype, 
    "onDisabledChange", 
    null
);

__decorate(
    [
        property({ type: Function }),
        observe("focused")
    ], 
    clPolymerFormInputContainer.prototype, 
    "onFocusedChange", 
    null
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true }),
        computed("errorMessage")
    ], 
    clPolymerFormInputContainer.prototype, 
    "invalid", 
    null
);

__decorate(
    [
        property({ type: Object }),
        computed("errorMessage", "extended", "errorMessageBelowInput")
    ], 
    clPolymerFormInputContainer.prototype, 
    "shouldShowErrorMessageBelowInput", 
    null
);

__decorate(
    [
        property({ type: Object }),
        computed("errorMessageBelowInput")
    ], 
    clPolymerFormInputContainer.prototype, 
    "shouldUseErrorTip", 
    null
);

__decorate(
    [
        property({ type: HTMLElement }),
        query("#child-input")
    ], 
    clPolymerFormInputContainer.prototype, 
    "childInput", 
    void 0
);

clPolymerFormInputContainer = __decorate([
    customElement("cl-polymer-form-input-container")
], clPolymerFormInputContainer);

export { clPolymerFormInputContainer };