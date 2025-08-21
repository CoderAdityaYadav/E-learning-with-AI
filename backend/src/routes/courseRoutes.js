import express from 'express'
import { getCourses,getCourseById,createCourse,updateCourse,deleteCourse,enrollCourse } from '../controller/course.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);

router.post("/",protect, createCourse);
router.put("/:id",protect, updateCourse);
router.delete("/:id",protect, deleteCourse);

router.post("/:id/enroll", protect, enrollCourse);

export default router;