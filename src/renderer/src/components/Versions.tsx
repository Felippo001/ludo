import { useState } from 'react'

console.log("listening for events")
window.electron.ipcRenderer.on('message', function(event, text) {
  // var container = document.getElementById('messages');
  // var message = document.createElement('div');
  // message.innerHTML = text;
  // container.appendChild(message);
  console.log(event, text)
})

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul className="versions">
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
      <li className="v8-version">V8 v{versions.v8}</li>
      <li className="v8-version">{(window.api as any).getVersion()}</li>
    </ul>
  )
}

export default Versions
