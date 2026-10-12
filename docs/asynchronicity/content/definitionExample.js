useEffect(() => {
  const fetchTestimonials = async () => {
    if (items?.length) {
      const newTestimonials = await Promise.all(
        items.map(async (item) => {
          let testimonialData;
          if (item?.testimonialEntity) {
            testimonialData = await getPulledQuoteData(item?.testimonialEntity);
            return {
              author: testimonialData?.author,
              otherThings: testimonialData?.etc,
            };
          }
        }),
      );
      if (!ignore) {
        setTestimonials(newTestimonials);
      }
    }
  };
  let ignore = false;
  fetchTestimonials();
  return () => {
    ignore = true;
  };
}, [items]);
