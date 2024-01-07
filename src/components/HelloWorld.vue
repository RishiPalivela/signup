<template>
  <div class="signup-container">
    <div class="signup-form">
      <h2>Sign Up</h2>
      <form>
        <!-- Name fields -->
        <div class="namefields">
          <k-textbox v-model="firstName" :label="'First Name'" :required="true" />
          <k-textbox v-model="lastName" :label="'Last Name'" :required="true" />
        </div>
        <!-- Email field -->
        <div class="Email">
          <k-textbox v-model="email" :label="'Email'" :required="true" :valid="isEmailValid" :style="{ width: '495px' }"/>
        </div>
        <!-- Password fields -->
        <div class="Password">
          <k-textbox v-model="password" :label="'Password'" :required="true" />
          <k-textbox v-model="confirmPassword" :label="'Confirm Password'" :required="true" />
        </div>
        <!-- Submit button -->
        <k-button @click.prevent="submitForm">Sign Up</k-button>
      </form>
      <!-- Success message displayed when the form is successfully submitted -->
      <div v-if="success" class="success-message">
        Your account has been created successfully!
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { TextBox } from '@progress/kendo-vue-inputs';
import { Button } from '@progress/kendo-vue-buttons';

export default {
  components: {
    'k-textbox': TextBox,
    'k-button': Button,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      success: false,
    };
  },
  computed: {
    isEmailValid() {
      // Add your email validation logic here
      // For simplicity, we'll consider any non-empty string as a valid email
      return this.email.trim() !== "";
    },
  },
  methods: {
    submitForm() {
      // Perform form submission logic
      if (this.password !== this.confirmPassword) {
        console.error("Password and Confirm Password do not match.");
        return;
      }

    const requestData = {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password,
  };

  console.log('Sending request with data:', requestData);

      axios.post('http://localhost:3000/api/signup', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      })
      .then(response => {
        // Handle the response (you may want to show a success message or redirect the user)
        console.log(response.data);
        this.success = true;
        this.resetForm();
      })
      .catch(error => {
        // Handle errors (you may want to show an error message to the user)
        console.error(error);
      });
    },

    resetForm() {
      // Reset form fields
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.success = false;
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.signup-form {
  width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

button {
  width: 100%;
  margin-top: 10px;
}

.namefields {
  display: flex;
  gap: 50px;
  flex: 1; 
}

.Email {
  display: flex;
}

.Password {
  display: flex;
  gap: 50px;
  flex: 1;
}
</style>
