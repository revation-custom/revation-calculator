import { AnimatePresence, motion } from 'framer-motion';

const PopupLayout = ({ key, children }: KeyProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupLayout;
