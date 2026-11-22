
export const checkHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "GitSummarizer backend is working!",
    status: "Healthy",
    timestamp: new Date().toISOString()
  });
};
