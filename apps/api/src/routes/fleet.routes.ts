import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  getFleetOverviewController,
  getFleetVehiclesController,
  seedFleetDataController,
  getVehicleLocationController,
} from '../controllers/fleet.controller.js';

const router = Router();

router.get('/overview', requireAuth, getFleetOverviewController);
router.get('/vehicles', requireAuth, getFleetVehiclesController);
router.get('/vehicles/:vehicleId/location', requireAuth, getVehicleLocationController);
router.post('/seed', requireAuth, seedFleetDataController);

export default router;
