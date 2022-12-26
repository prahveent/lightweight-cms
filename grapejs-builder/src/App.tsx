import React, {useEffect, useState} from 'react';
import {GEditor, GrapesPluginType} from "grapesjs-react";
import 'grapesjs/dist/css/grapes.min.css';

import TemplateDisplay from "./templateDisplay";

import {  headerPluginRef } from './header/consts';
import addheaderPlugin from './header';

const App: React.FC = () => {

    const [htmlString, setHtmlString] = useState(null);
    const [cssString, setCssString] = useState("");
    const [pluginLoaded, setPluginLoaded] = useState(false);

    if (!pluginLoaded) {
        addheaderPlugin();
        setPluginLoaded(true);
    }

    return (
        <>
            <GEditor id="geditor" plugins={[headerPluginRef]}/>
            <TemplateDisplay jsxString={htmlString} cssString={cssString} />
        </>
    );
}

export default App;
