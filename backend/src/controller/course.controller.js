import Course from "../models/Course.js";

export const getCourses = async (req, res) => {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
};

export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("instructor", "name email")
            .populate("studentsEnrolled", "name email");
        if (!course)
            return res.status(400).json({ message: "Course not found" });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const course = await Course.create({
            title,
            description,
            price,
            instructor: req.user._id,
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const course =await Course.findById(req.params.id);
        if (!course) res.status(404).json({ message: "Course not found" });
        if (
            course.instructor.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            res.status(403).json({ message: "Not authorized" });
        }
        course.title = req.body.title || course.title;
        course.description = req.body.description || course.description;
        course.price = req.body.price || course.price;

        const updated = course.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) res.status(404).json({ message: "Course not found" });
        if (
            course.instructor.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }
        await course.deleteOne();
        res.json({ message: "Course deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const enrollCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) res.status(404).json({ message: "Course not found" });
        if (course.studentsEnrolled.includes(req.user._id)) {
            return res.status(400).json({ message: "Already Enrolled" });
        }
        course.studentsEnrolled.push(req.user._id);
        await course.save();
        res.json({ message: "Enrolled successfully", course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
