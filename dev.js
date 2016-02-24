var exec = require('ssh-exec');

exec('cd apps/ppu-pruebas && ls', 'deploy@104.131.161.42').pipe(process.stdout);
