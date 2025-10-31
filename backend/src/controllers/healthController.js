exports.health = async (req, res) => {
  try {
    // const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.status(200).json({
      status: 'ok',
    //   db: dbStatus,
      uptime: process.uptime(),
      timestamp: new Date(),
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
