const sequelize = require('./db');
const Exercise = require('./Exercise');
const Training = require('./Training');
const User = require('./User');
const Sprint = require('./Sprint');

Exercise.belongsToMany(Training, { through: 'ExercicioTreino' });
Training.belongsToMany(Exercise, { through: 'ExercicioTreino' });

Training.belongsTo(Sprint, {foreignKey: 'sprintId'});
Exercise.belongsTo(User, {foreignKey: 'personal'});
Sprint.belongsTo(User, {foreignKey: 'personal'});

sequelize.sync()
  .then(() => console.log("Banco de dados sincronizado"))
  .catch((error) => console.error("Erro ao sincronizar banco de dados:", error));
