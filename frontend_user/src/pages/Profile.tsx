function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
    </div>
  );
}
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar/Navbar";
import UserAvatar from "@/components/Profile/UserAvatar";
import ProfileField from "@/components/Profile/ProfileField";
import EditProfileForm from "@/components/Profile/EditProfileForm";
import DeleteAccountDialog from "@/components/Profile/DeleteAccountDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Utility functions
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

const displayGender = (gender: string) =>
  gender === "M" ? "Male" : gender === "F" ? "Female" : "Other";

const displayIdType = (type: string) => {
  switch (type) {
    case "passport":
      return "Passport";
    case "driver_license":
      return "Driver's License";
    default:
      return "Other";
  }
};

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  nationality: string;
  dateOfBirth: string;
  idType: string;
  identificationNumber: string;
  fullName?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded: { sub: string } = jwtDecode(token);
      const guestId = decoded.sub;
    
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
    
      console.log("Sending request to /me endpoint with config:", config);
    
      axios
        .get("http://localhost:3000/api/v1/hotels/1/me", config)
        .then((res) => {
          console.log("Response from /me endpoint:", res);
    
          const data = res.data.data;
          const fullName = `${data.firstName} ${data.lastName}`;
          setProfileData({ ...data, fullName });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err?.response || err);
          toast({
            title: "Session expired",
            description: "Please log in again",
            variant: "destructive",
          });
          navigate("/login");
        });
    } catch (error) {
      console.error("Invalid token:", error);
      toast({
        title: "Invalid session",
        description: "Please log in again",
        variant: "destructive",
      });
      navigate("/login");
    }    
  }, [navigate, toast]);

  const handleSaveProfile = async (updatedFields: Partial<ProfileData>) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const cleanedData: Record<string, any> = {};
      for (const key in updatedFields) {
        const value = updatedFields[key as keyof ProfileData];
        if (value !== undefined && value !== null) {
          cleanedData[key] = value;
        }
      }

      await axios.patch("http://localhost:3000/api/v1/hotels/1/me", cleanedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({ title: "Profile updated successfully" });

      // Update fullName if firstName or lastName changes
      setProfileData((prev) => {
        if (!prev) return null;
        const updated = { ...prev, ...cleanedData };
        updated.fullName = `${updated.firstName} ${updated.lastName}`;
        return updated;
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.delete("http://localhost:3000/api/v1/hotels/1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({ title: "Account deleted successfully" });
      localStorage.removeItem("token");
      navigate("/signup");
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast({
        title: "Error",
        description: "Failed to delete account",
        variant: "destructive",
      });
    }
  };

  if (loading || !profileData) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Guest Profile</h1>
          <p className="text-gray-500">View and manage your personal information</p>
        </div>

        <Card className="rounded-2xl shadow-md overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <UserAvatar name={profileData.fullName || ""} />
                <div>
                  <h2 className="text-xl font-semibold">{profileData.fullName}</h2>
                  <p className="text-gray-600">{profileData.email}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <Button onClick={() => setIsEditDialogOpen(true)} className="flex items-center gap-2">
                  <Edit size={16} />
                  <span>Edit Profile</span>
                </Button>
              </div>

              <Separator className="mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <ProfileField label="Full Name" value={profileData.fullName || ""} />
                <ProfileField label="Email" value={profileData.email} />
                <ProfileField label="Phone Number" value={profileData.phone} />
                <ProfileField label="Gender" value={displayGender(profileData.gender)} />
                <ProfileField label="Address" value={profileData.address} />
                <ProfileField label="Nationality" value={profileData.nationality} />
                <ProfileField label="Date of Birth" value={formatDate(profileData.dateOfBirth)} />
                <ProfileField label="Identification Type" value={displayIdType(profileData.idType)} />
                <ProfileField label="Identification Number" value={profileData.identificationNumber} />
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Management</h3>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 size={16} />
                  <span>Delete Account</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <EditProfileForm
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        profileData={profileData}
        onSave={handleSaveProfile}
      />

      <DeleteAccountDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
};

export default Profile;