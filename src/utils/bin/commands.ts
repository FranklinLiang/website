// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';
import files from '../../../files.json';
import adversary from '../../../adversary.json'
import network from '../../../network.json'

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');
  var c = '';
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    
    //I want to always have it separated by line breaks
    c += Object.keys(bin).sort()[i - 1] + '\n';

  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
Type 'neofetch' to display summary.
`;
};

/*
// Redirection (Removed)
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};
*/

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I'm Franklin!
Welcome to my website!
I’m a recent graduate of the University of Waterloo where I studied mathematics and computing. 
I have a strong interest in the topics of privacy, cybersecurity, and infosec. 
Feel free to contact me via email to chat about anything!`;
};

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

// Donate (Removed)
/*
export const donate = async (args: string[]): Promise<string> => {
  return `thank you for your interest. 
here are the ways you can support my work:
- <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_urls.paypal}" target="_blank">paypal</a></u>
- <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.donate_urls.patreon}" target="_blank">patreon</a></u>
`;
};
*/

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

  return 'Opening linkedin...';
};

// Blog command and link
export const blog = async(args: string[]): Promise<string> => {
  window.open(`https://blog.franklinliang.com`);

  return 'Opening blog...';
}

// Search (Removed)
/*
export const google = async (args: string[]): Promise<string> => {
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};

export const duckduckgo = async (args: string[]): Promise<string> => {
  window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searching duckduckgo for ${args.join(' ')}...`;
};

export const bing = async (args: string[]): Promise<string> => {
  window.open(`https://bing.com/search?q=${args.join(' ')}`);
  return `Wow, really? You are using bing for ${args.join(' ')}?`;
};

export const reddit = async (args: string[]): Promise<string> => {
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};
*/

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

//ls command reads files from files.json
export const ls = async (args: string[]): Promise<string> => {
  let file_names = "";
  
  files.files.forEach(file => {
    file_names += `${file.name}\n`;
  });
  
  return file_names;
};

//cat command reads file content from files in files.json
export const cat = async (args: string[]): Promise<string> => {
  const file = files.files.find(file => file.name === args[0]);

  if (file) {
    return `${file.content}`;
  } else {
    return `File ${args[0]} does not exist.`
  };
};

//ifconfig command looks at (fake) network information
export const ifconfig = async (args: string[]): Promise<string> => {
  return `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.1  netmask 255.255.240.0  broadcast 192.168.1.255
        inet6 fd4b:32a1:b6cd:efc0:c0a8:0101  prefixlen 64  scopeid 0x20<link>
        ether 3A:57:8C:12:F4:B9  txqueuelen 1000  (Ethernet)
        RX packets 434449  bytes 417019525 (417.0 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 146386  bytes 20112770 (20.1 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 468855  bytes 253389687 (253.3 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 468855  bytes 253389687 (253.3 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0`;
};

//tcpdump command looks at (simulated) network traffic
export const tcpdump = async (args: string[]): Promise<string> => {
  //grabbing current user time
  const currentTime = new Date();
  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;

  return `${formattedTime}:32.123456 IP 192.168.2.17.54872 > 192.168.1.1.80: Flags [S], seq 1234567890, win 65535, options [mss 1460,sackOK,TS val 123456789 ecr 0,nop,wscale 7], length 0
${formattedTime}:32.123789 IP 192.168.1.1.80 > 192.168.2.17.54872: Flags [S.], seq 987654321, ack 1234567891, win 65535, options [mss 1460,sackOK,TS val 987654321 ecr 123456789,nop,wscale 7], length 0
${formattedTime}:32.124012 IP 192.168.2.17.54872 > 192.168.1.1.80: Flags [.], ack 987654322, win 65535, options [nop,nop,TS val 123456790 ecr 987654321], length 0
${formattedTime}:32.124345 IP 192.168.2.17.54872 > 192.168.1.1.80: Flags [P.], seq 1234567891:1234567903, ack 987654322, win 65535, options [nop,nop,TS val 123456791 ecr 987654321], length 12
${formattedTime}:32.124678 IP 192.168.1.1.80 > 192.168.2.17.54872: Flags [.], ack 1234567903, win 65535, options [nop,nop,TS val 987654322 ecr 123456791], length 0
${formattedTime}:39.543210 IP 203.0.113.5.56789 > 192.168.1.1.21: Flags [S], seq 654321098, win 65535, options [mss 1460,sackOK,TS val 223344556 ecr 0,nop,wscale 7], length 0
${formattedTime}:39.543789 IP 192.168.1.1.21 > 203.0.113.5.56789: Flags [S.], seq 789012345, ack 654321099, win 65535, options [mss 1460,sackOK,TS val 556677889 ecr 223344556,nop,wscale 7], length 0
${formattedTime}:39.544012 IP 203.0.113.5.56789 > 192.168.1.1.21: Flags [.], ack 789012346, win 65535, options [nop,nop,TS val 223344557 ecr 556677889], length 0
${formattedTime}:39.544345 IP 203.0.113.5.56789 > 192.168.1.1.21: Flags [P.], seq 654321099:654321121, ack 789012346, win 65535, options [nop,nop,TS val 223344558 ecr 556677889], length 22
${formattedTime}:39.544678 IP 192.168.1.1.21 > 203.0.113.5.56789: Flags [F.], seq 789012346, ack 654321121, win 65535, options [nop,nop,TS val 556677890 ecr 223344558], length 0
${formattedTime}:39.545012 IP 203.0.113.5.56789 > 192.168.1.1.21: Flags [R], seq 654321121, win 0, length 0
`;
};

//nmap command scans (fake) ips to see running services, os information, etc...
export const nmap = async (args: string[]): Promise<string> => {
  /*
  two IPs will return unique data:
  203.0.113.5 will be the external adversary IP
  192.168.2.17 is another machine on the network
  all other IPs will fail to resolve
  */

  const isValidIPv4 = (ip: string): boolean => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
    return ipv4Regex.test(ip);
  };

  //Getting the date and time in UTC for the nmap command outputs
  const getCurrentDateTimeUTC = (): string => {
    const now = new Date();

    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes} UTC`;
  };

  if (args[0] === undefined) {
    //&lt; is <
    //&gt; is >
    return `use format: nmap &lt;ipv4_address&gt;`;
  }

  else if (args[0] === "203.0.113.5") { //adversary IP
    return `Starting Nmap 7.93 ( https://nmap.org ) at ${getCurrentDateTimeUTC()}
Nmap scan report for 203.0.113.5
Host is up (0.015s latency).
Not shown: 997 closed ports
PORT     STATE SERVICE
21/tcp   open  ftp
80/tcp   open  http
443/tcp  open  https

Nmap done: 1 IP address (1 host up) scanned in 0.52 seconds`
  } else if (args[0] === "192.168.2.17") { //internal network IP
    return `Starting Nmap 7.93 ( https://nmap.org ) at ${getCurrentDateTimeUTC()}
Nmap scan report for 192.168.2.17
Host is up (0.005s latency).
Not shown: 998 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
3389/tcp open  ms-wbt-server

Nmap done: 1 IP address (1 host up) scanned in 0.37 seconds`
  } else if (isValidIPv4(args[0])) { //all other valid IP
    return `Starting Nmap 7.93 ( https://nmap.org ) at ${getCurrentDateTimeUTC()}
Failed to resolve "${args[0]}".
Nmap done: 0 IP addresses (0 hosts up) scanned in 0.02 seconds`
  } else { //invalid IP
    return `Starting Nmap 7.93 ( https://nmap.org ) at ${getCurrentDateTimeUTC()}
Invalid IPv4 address "${args[0]}".
Nmap done: 0 IP addresses (0 hosts up) scanned in 0.00 seconds`
  }
};

export const ftp = async (args: string[]): Promise<string> => {
  if (args[0] === undefined) {
    return `use the flag --help to see a list of commands`
  } else if (args[0] === "--help") {
    //&lt; is <
    //&gt; is >
    return `ftp &lt;ipv4_address&gt; &lt;flags&gt;
FLAGS
  -p <password>: Password
  -l: List files/directories
  -v <file_name>: View file content`
  }

  //parse flags and store flag values
  let ip : string | null = null;
  let password : string | null = null;
  let file_name : string | null = null;
  let list : boolean | null = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (!ip && !arg.startsWith('-')) {
      ip = arg;
    }
  
    else if (arg === '-p' && i+1 < args.length) {
      password = args[i+1];
      i++;
    }

    else if (arg === '-v' && i+1 < args.length) {
      file_name = args[i+1];
      i++;
    }

    else if (arg === '-l') {
      list = true;
    }
  }

  const isValidIPv4 = (ip: string): boolean => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
    return ipv4Regex.test(ip);
  };
  
  //Main handling logic, checks if ip provided is special ip, otherwise provide error output
  if (ip === "203.0.113.5" || ip === "192.168.2.17") {
    let machine;

    if (ip === "203.0.113.5") {
      machine = adversary;

      if (password !== Buffer.from("aHVudGVyMg==", 'base64').toString('utf-8')) {
        return `ftp: connect: Incorrect password`;
      }

    } else if (ip === "192.168.2.17") {
      machine = network;

      if (password !== Buffer.from("YnVubnk=", 'base64').toString('utf-8')) {
        return `ftp: connect: Incorrect password`;
      }
    }
    //list files command
    if (list) {
      let file_names = "";
  
      machine.files.forEach(file => {
      file_names += `${file.name}\n`;
    });
  
    return file_names;
    }
    //display file content command
    if (file_name) {
      const file = machine.files.find(file => file.name === file_name);

      if (file) {
        return `${file.content}`;
      } else {
        return `File ${file_name} does not exist.`;
      };
    }
  }

  else if (isValidIPv4(ip)) {
    return `ftp: connect: Connection timed out`;
  }

  else {
    return `ftp: connect: Invalid IPv4 address`;
  }
};

export const flag = async (args: string[]): Promise<string> => {
  if (args[0] === Buffer.from("TElBTkd7Q09OR1JBVFVMQVRJT05TfQ==", 'base64').toString('utf-8')) {
    return `
   █████████                                                    █████               ████             █████     ███                              ███
  ███░░░░░███                                                  ░░███               ░░███            ░░███     ░░░                              ░███
 ███     ░░░   ██████  ████████    ███████ ████████   ██████   ███████   █████ ████ ░███   ██████   ███████   ████   ██████  ████████    █████ ░███
░███          ███░░███░░███░░███  ███░░███░░███░░███ ░░░░░███ ░░░███░   ░░███ ░███  ░███  ░░░░░███ ░░░███░   ░░███  ███░░███░░███░░███  ███░░  ░███
░███         ░███ ░███ ░███ ░███ ░███ ░███ ░███ ░░░   ███████   ░███     ░███ ░███  ░███   ███████   ░███     ░███ ░███ ░███ ░███ ░███ ░░█████ ░███
░░███     ███░███ ░███ ░███ ░███ ░███ ░███ ░███      ███░░███   ░███ ███ ░███ ░███  ░███  ███░░███   ░███ ███ ░███ ░███ ░███ ░███ ░███  ░░░░███░░░ 
 ░░█████████ ░░██████  ████ █████░░███████ █████    ░░████████  ░░█████  ░░████████ █████░░████████  ░░█████  █████░░██████  ████ █████ ██████  ███
  ░░░░░░░░░   ░░░░░░  ░░░░ ░░░░░  ░░░░░███░░░░░      ░░░░░░░░    ░░░░░    ░░░░░░░░ ░░░░░  ░░░░░░░░    ░░░░░  ░░░░░  ░░░░░░  ░░░░ ░░░░░ ░░░░░░  ░░░ 
                                  ███ ░███                                                                                                         
                                 ░░██████                                                                                                          
                                  ░░░░░░                                                                                                           
    `;
  } else if (args[0] === undefined){
    return `Error: Please enter flag`
  } else {
    return `Error: Incorrect flag`
  }
};

export const cd = async (args: string[]): Promise<string> => {
  return `unfortunately, i cannot afford more directories.`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

/* Default for fun commands. (Removed)
export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};
*/

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

// Banner
export const banner = (args?: string[]): string => {
  return `
███████╗██████╗  █████╗ ███╗   ██╗██╗  ██╗██╗     ██╗███╗   ██╗    ██╗     ██╗ █████╗ ███╗   ██╗ ██████╗ 
██╔════╝██╔══██╗██╔══██╗████╗  ██║██║ ██╔╝██║     ██║████╗  ██║    ██║     ██║██╔══██╗████╗  ██║██╔════╝ 
█████╗  ██████╔╝███████║██╔██╗ ██║█████╔╝ ██║     ██║██╔██╗ ██║    ██║     ██║███████║██╔██╗ ██║██║  ███╗
██╔══╝  ██╔══██╗██╔══██║██║╚██╗██║██╔═██╗ ██║     ██║██║╚██╗██║    ██║     ██║██╔══██║██║╚██╗██║██║   ██║
██║     ██║  ██║██║  ██║██║ ╚████║██║  ██╗███████╗██║██║ ╚████║    ███████╗██║██║  ██║██║ ╚████║╚██████╔╝
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝    ╚══════╝╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                                                                         
Type 'help' to see the list of available commands.
Type 'neofetch' to display summary.
`;
};
