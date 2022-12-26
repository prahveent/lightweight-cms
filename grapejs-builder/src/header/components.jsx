/**
 *
 * This is the Timer grapesjs component, which generates JSX for its template representation and uses
 * a react component (react-compound-timer) to display the actual live Timer.
 *
 * The main trick here is that onRender() time we mount the actual react component onto the html that grapesjs uses
 * to represent our component (this is <div class="timer" data-gjs-type="${timerRef}"></div> as defines in blocks.js).
 *
 * Also, the component's model is represented as JSX, in this example a simplified version of the <Timer/> component.
 *
 * This example also includes traits for editing the live Timer's properties:
 * - startFrom: by default the timer will count forward. If startFrom is set it will start backwards from that date
 * - timerLabel: the label to display in front of the timer
 * - displayLabels: if unchecked displays time as 19, 22:10:15. If checked: 19 days 20 hours 10 minutes 15 seconds.
 */
import React, { useState , useEffect} from 'react';
import axios from 'axios';




import ReactDOM from 'react-dom';
import { headerRef } from "./consts";

export default function (editor, opt = {}) {
    const c = opt;
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

   


    domc.addType(headerRef, {

        model: defaultModel.extend({
            defaults: {
                ...defaultModel.prototype.defaults,
                header : '',
                headerProp : '',
                displayLabels: c.displayLabels,
                droppable: false,
            },
        //     init() {
        //         console.log('Local hook: model.init', this.attributes.headerProp);
        //         axios.get('https://dummyjson.com/products/1')
        //             .then(response => response.data['description'] + new Date().toLocaleString())
        //             .then(commits => {
        //                 this.set('headerProp', commits);
        //                 console.log(this.attributes.headerProp);
        //             });
        //         this.listenTo(this, 'change:headerProp', this.handlePropChange);
        //         // Here we can listen global hooks with editor.on('...')
        //     },
        //     updated(property, value, prevValue) {
        //         console.log('Local hook: model.updated',
        //             'property', property, 'value', value, 'prevValue', prevValue);
        //     },
        //     removed() {
        //         console.log('Local hook: model.removed');
        //     },
        //     handlePropChange() {
        //         //  let prop = this.get('headerProp');
        //         // // Here inside view it is getting the old value. of "headerProp" i.e '12345' but not 
        //         // //the new value 
        //         // //which is being fetched from server in the init() of model.
        //         // let comp1 = ( 
        //         //         <div> 
        //         //             {prop} 
        //         //         </div>
        //         //     )
        //         //     const component = editor.addComponents(comp1);
        //         //return component
        //     }
        }),

        view: {
            init() {
                console.log('Local hook: view.init');
            },
        },

        view: defaultView.extend({
            init() {
                axios.get('https://dummyjson.com/products/1')
                    .then(res => { this.model.set('header', res.data['description'])})
                this.listenTo(this, 'change:header', this.handleChanges);
            },

            handleChanges(e) {
                ReactDOM.unmountComponentAtNode(this.el);
                this.render();
            },

            onRender({el}) {

                ReactDOM.render( <Com1 />, el);
            },

        }),
    });
}



export function Com1(props) {
    const [headers, setHeaders] = useState([])
    useEffect(() => { 
        // here is where you make API call(s) or any side effects
        axios.get('http://localhost:1337/api/headers')
        .then(res => { setHeaders(res.data.data)})
      },[] )
    
    return (
        <div style={{ height: '50px', backgroundColor : 'Red', fontSize : '50px'}}>
          <ul style={ { display : 'flex', flexDirection : 'row',justifyContent : 'center', gap : '100px'}}>
            {headers.map(h => (<li style={{flex : 'auto;'}}>{h.attributes.Name}</li>))}
           </ul>
        </div>
      );

}

