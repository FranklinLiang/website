import * as bin from './bin';
import files from '../../files.json';

export const handleTabCompletion = (
  command: string,
  setCommand: React.Dispatch<React.SetStateAction<string>>,
) => {
  // Split command into parts
  const parts = command.split(' ');

  // If it's a single word, complete commands
  if (parts.length === 1) {
    const commands = Object.keys(bin).filter((entry) =>
      entry.startsWith(command),
    );

    if (commands.length === 1) {
      setCommand(commands[0]);
    }
  }
  // If it starts with "cat" and has a second part, complete filenames
  else if (parts[0] === 'cat' && parts.length === 2) {
    const fileNames = files.files
      .map((file) => file.name)
      .filter((name) => name.startsWith(parts[1]));

    if (fileNames.length === 1) {
      setCommand(`cat ${fileNames[0]}`);
    }
  }
};
