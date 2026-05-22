import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('userId teamId')
      .sort({ rank: 1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findById(req.params.id).populate('userId teamId');
    if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard entry', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const entry = new Leaderboard(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Error creating leaderboard entry', error });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Error updating leaderboard entry', error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
    res.json({ message: 'Leaderboard entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting leaderboard entry', error });
  }
});

export default router;
