import { Router } from 'express';
import {
  getTeams,
  getTeam,
  addTeam,
  updateTeam,
  deleteTeam,
} from '../../models/teams';

const router = Router();

router.get('/', async (req, res) => {
  const size = Number(req.query.size) || 10;
  const page = Number(req.query.page) || 1;
  const skip = size * (page - 1);
  const take = size;
  const { count, teams } = await getTeams(skip, take);
  res.set({
    'X-Total-Count': count,
    'X-Total-Pages': Math.ceil(count / size),
  });
  res.send(teams);
});

router.get('/:id', async (req, res) => {
  const team = await getTeam(req.params.id);
  if (team) {
    res.send(team);
  } else {
    res.status(404).send({ msg: 'Team not found' });
  }
});

router.post('/', async (req, res) => {
  const team = await addTeam(req.body);
  res.send(team);
});


router.put('/:id', async (req, res) => {
  const team = await updateTeam(req.params.id, req.body);
  if (team) {
    res.send(team);
  } else {
    res.status(404).send({ msg: 'Team not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const team = await deleteTeam(req.params.id);
  if (team) {
    res.send(team);
  } else {
    res.status(404).send({ msg: 'Team not found' });
  }
});

export default router;
