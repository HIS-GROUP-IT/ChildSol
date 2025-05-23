import React from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface StudentData {
  id?: string;
  name: string;
  gender: string;
  age: number;
  school?: string;
  parentNumber?: string;
  isApproved?: boolean;
}

interface StudentCardProps {
  student: StudentData;
  onApprove?: (student: StudentData) => void;
  onView?: (student: StudentData) => void;
  onArchive?: (student: StudentData) => void;
  showOptions?: boolean;
  showActions?: boolean;
  className?: string;

  // Additional classroom view fields
  teacherName?: string;
  classRoomNumber?: string;

  // Control visibility of fields
  showSchool?: boolean;
  showParentNumber?: boolean;
  showTeacherName?: boolean;
  showClassRoom?: boolean;
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onApprove,
  onView,
  onArchive,
  showOptions = true,
  showActions = true,
  className,
  teacherName,
  classRoomNumber,
  showSchool = true,
  showParentNumber = true,
  showTeacherName = false,
  showClassRoom = false,
}) => {
  const {
    name,
    gender,
    age,
    school,
    parentNumber,
    isApproved = false,
  } = student;

  // Extract initials for the avatar
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex rounded-2xl bg-white items-center justify-between py-6 px-2 border-b border-gray-100 ${className}`}
    >
      {/* Left section - Avatar and name */}
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-pink-300 flex items-center justify-center text-white font-medium">
            {initials}
          </div>
        </div>
        <div>
          <p className="font-medium text-gray-800">{name}</p>
        </div>
      </div>

      {/* Middle section - Details */}
      <div className="flex-grow flex justify-between mx-4 max-w-2xl">
        <div className="text-center px-4">
          <p className="text-xs text-gray-500">Gender</p>
          <p className="text-sm">{gender}</p>
        </div>

        <div className="text-center px-4">
          <p className="text-xs text-gray-500">Full Age</p>
          <p className="text-sm">{age}</p>
        </div>

        {showSchool && school && (
          <div className="text-center px-4">
            <p className="text-xs text-gray-500">School</p>
            <p className="text-sm">{school}</p>
          </div>
        )}

        {showParentNumber && parentNumber && (
          <div className="text-center px-4">
            <p className="text-xs text-gray-500">Parent Number</p>
            <p className="text-sm">{parentNumber}</p>
          </div>
        )}

        {showTeacherName && teacherName && (
          <div className="text-center px-4">
            <p className="text-xs text-gray-500">Teacher</p>
            <p className="text-sm">{teacherName}</p>
          </div>
        )}

        {showClassRoom && classRoomNumber && (
          <div className="text-center px-4">
            <p className="text-xs text-gray-500">Classroom</p>
            <p className="text-sm">{classRoomNumber}</p>
          </div>
        )}
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center">
        {showActions && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onView && onView(student)}
              className="px-3 py-1 bg-yellow-400 text-white text-xs rounded-full"
            >
              Full view
            </button>

            {/* {!isApproved && (
              <button
                onClick={() => onApprove && onApprove(student)}
                className="px-3 py-1 bg-yellow-400 text-white text-xs rounded-full"
              >
                Approve
              </button>
            )} */}

            {isApproved && (
              <button
                onClick={() => onArchive && onArchive(student)}
                className="text-gray-500 text-xs"
              >
                Archive
              </button>
            )}
          </div>
        )}

        {showOptions && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-2 p-1 text-gray-500">
                <MoreVertical size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onView?.(student)}>
                View
              </DropdownMenuItem>
              {!isApproved && (
                <DropdownMenuItem onClick={() => onApprove?.(student)}>
                  Approve
                </DropdownMenuItem>
              )}
              {isApproved && (
                <DropdownMenuItem onClick={() => onArchive?.(student)}>
                  Archive
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
