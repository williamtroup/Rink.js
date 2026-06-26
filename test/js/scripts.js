( () => {
    document.addEventListener( "DOMContentLoaded", () => {
        document.title += ` - v${$rink.getVersion()}`;
        document.getElementById( "header" ).innerText = document.title;
    } );
} )();

function setupConfiguration() {
    $rink.setConfiguration( {
        safeMode: false
    } );
}

function getVersion() {
    console.log( $rink.getVersion() );
}