import { Terminal } from "./terminal";
import { TextBlock } from "./text-block";

const textBlock = new TextBlock();
textBlock.foregroundColor = 'yellow';
textBlock.text = [
    'Hello, ',
    new TextBlock.Run({
        text: 'World',
        foregroundColor: 'red',
    }),
];

const terminal = new Terminal();
terminal.child = textBlock;
terminal.render();
