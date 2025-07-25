const Listing=require("../models/listing")
const Review=require("../models/review")

module.exports.createReview=async(req,res)=>{
  let listing=await Listing.findById(req.params.id);
  let newReview=new Review(req.body.review);
  newReview.author=req.user._id;

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
   req.flash("success","New Review Created");
  // console.log("new review saved");
  // res.send("new review saved");
  res.redirect(`/listings/${listing._id}`)
}

module.exports.destroyReview=async (req, res) => {
  const { id, reviewId } = req.params;

  // Remove the review from the Listing document's 'reviews' array
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Remove the actual Review document
  await Review.findByIdAndDelete(reviewId);
   req.flash("success","Review Deleted");
  res.redirect(`/listings/${id}`);
}