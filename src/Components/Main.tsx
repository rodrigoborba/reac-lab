import React, {Suspense } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Load from "./Load";
import ListarOperacoes from '../pages/listar-operacoes/Operacoes';

const renderLoader = () => {
    return <Load></Load>
};

const Main = () => (
    <Suspense fallback={renderLoader()}>

<Switch >
        <Route>

            <Route path='/ListarOperacoes' component={ListarOperacoes} /> 

            {/* <Route path="*" component={Page404} /> */}
            {/* <Route component={Page404} /> */}
        </Route>
    </Switch>

    </Suspense>
   
);

export default withRouter(Main);