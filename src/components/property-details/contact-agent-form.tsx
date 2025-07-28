import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Send } from "lucide-react";
import { Button } from "../ui/button";

const ContactAgentForm = () => {
  const agent = {
    name: "Sarah Johnson",
    role: "Sales Consultant Responsible for this listing",
    image: "/images/team/carolina.jpg",
  };

  return (
    <>
      {/* Agent Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
          <Image
            src={agent.image}
            alt={agent.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
            {/* <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold hidden">
                {agent.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div> */}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{agent.name}</h3>
          <p className="text-sm text-gray-300">{agent.role}</p>
        </div>
      </div>

      {/* Contact Form */}
      <form className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Name"
            className="bg-transparent border-0 border-b border-primary rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2"
          />
        </div>

        <div>
          <Input
            type="tel"
            placeholder="Phone number"
            className="bg-transparent border-0 border-b border-primary rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2"
          />
        </div>

        <div>
          <Input
            type="email"
            placeholder="E-mail address"
            className="bg-transparent border-0 border-b border-primary rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2"
          />
        </div>

        <div>
          <Textarea
            placeholder="Message"
            rows={4}
            className="bg-transparent border-0 border-b border-primary rounded-none text-white placeholder:text-white/70 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 px-0 pb-2 resize-none"
          />
        </div>

        <div>
          <Select>
            <SelectTrigger className="w-full bg-transparent border-0 border-b border-primary rounded-none text-white focus:border-primary focus:ring-0 focus:ring-offset-0 px-0 pb-2 [&>svg]:text-white">
              <SelectValue
                placeholder="Primary contact Channel"
                className="text-white/70"
              />
            </SelectTrigger>
            <SelectContent className="bg-black border-primary">
              <SelectItem
                value="email"
                className="text-white hover:bg-gray-800"
              >
                Email
              </SelectItem>
              <SelectItem
                value="phone"
                className="text-white hover:bg-gray-800"
              >
                Phone
              </SelectItem>
              <SelectItem
                value="whatsapp"
                className="text-white hover:bg-gray-800"
              >
                WhatsApp
              </SelectItem>
              <SelectItem value="sms" className="text-white hover:bg-gray-800">
                SMS
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Checkbox
            id="terms"
            className="border-primary data-[state=checked]:bg-white data-[state=checked]:text-black"
          />
          <label
            htmlFor="terms"
            className="text-sm text-white/90 cursor-pointer"
          >
            I agree to the terms and conditions
          </label>
        </div>

        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-none py-3 mt-6 relative flex items-center justify-center border border-primary"
        >
          <span className="absolute left-1/2 transform -translate-x-1/2 font-semibold">
            REQUEST INFORMATION
          </span>
          <Send className="w-4 h-4 absolute right-4" />
        </Button>
      </form>
    </>
  );
};

export default ContactAgentForm;
