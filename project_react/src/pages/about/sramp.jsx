import { motion } from "framer-motion";
import { useState } from "react";
import { Stamp } from "lucide-react";


export default function StampLoop() {
  const [key, setKey] = useState(0);
  return (
    <div>
      {/* קופסה חיצונית עם מיקום יחסי */}
      <motion.div
        key={key}
        initial={{ y: -550, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 6, damping: 4 }}
      >
        {/* החותמת - ממורכזת לחלוטין בתוך הקופסה */}
        <div>
          <Stamp size={140} strokeWidth={1}/>
        </div>
      </motion.div>
    </div>
  );
}
