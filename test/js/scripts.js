( () => {
    document.addEventListener( "DOMContentLoaded", () => {
        document.title += ` - v${$rink.getVersion()}`;
        document.getElementById( "header" ).innerText = document.title;
    } );
} )();

function setConfiguration() {
    $rink.setConfiguration( {
        responsiveDelay: 500,
    } );
}

function getVersion() {
    console.log( $rink.getVersion() );
}

function start() {
    $rink.start();
}

function stop() {
    $rink.stop();
}

function fetch() {
    $rink.fetch();
}

function refresh() {
    $rink.refresh();
}