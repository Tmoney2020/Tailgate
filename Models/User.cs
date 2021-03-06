using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Tailgate.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Email { get; set; }
        public string Username { get; set; }
        public string Team { get; set; }

        public string ProfilePhotoURL { get; set; }
        [JsonIgnore]
        public string HashedPassword { get; set; }
        public string Password
        {
            set
            {
                // When set, use the PasswordHasher to encrypt the password
                // and store the result in our HashedPassword
                this.HashedPassword = new PasswordHasher<User>().HashPassword(this, value);
            }
        }
        // Add a method that can validate this user's password
        public bool IsValidPassword(string password)
        {
            // Look to see if this password, and the user's hashed password can match
            var passwordVerification = new PasswordHasher<User>().VerifyHashedPassword(this, this.HashedPassword, password);
            // Return True if the verification was a success
            return passwordVerification == PasswordVerificationResult.Success;
        }
    }
}