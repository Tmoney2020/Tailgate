TRUNCATE TABLE "Parties", "Comments" RESTART IDENTITY;

INSERT INTO "Parties" ("Name", "Description", "Date", "Menu", "Type", "Event", "EndTime", "StartTime") VALUES ('Trents Party', 'This is going to be the biggest party of the year. Bring your friends and family, food and Drinks for everyone!', '04/09/2020','Hot Dogs, Hamburgers, Beer, Wine, Mules', 'NFL', 'Bucs Vs Saints', '5:00 PM', '1:00PM');
INSERT INTO "Parties" ("Name", "Description", "Date", "Menu", "Type", "Event", "EndTime", "StartTime") VALUES ('Kellys Party', 'Welcome to my amazing tailgate party. Everyone is going to be there so make sure you invite all of your friends', '09/23/2020', 'Pasta, wine, fried green tomoatoes, anything you can think of!', 'NBA', 'Magic Vs Lakers', '7:00 PM', '12:00 PM');
INSERT INTO "Parties" ("Name", "Description", "Date", "Menu", "Type", "Event", "EndTime", "StartTime") VALUES ('Tuckers Party', 'This is going to be a dogtastic party. SO make sure all of the pups come. Dog friendly games!', '12/31/2021', 'Bones, Kibble, and all the treats you can eat, there will also be milk, water', 'MLB', 'Rays Vs Yankees', '11:00 AM', '4:30 PM');


INSERT INTO "Comments" ("Body", "CreatedAt", "Flair", "PartyId") VALUES ('Had the best timne at this tailgate. I would recommend to anyone', '2020-01-01 12:23:55', 'Dance like you mean it', 1);
INSERT INTO "Comments" ("Body", "CreatedAt", "Flair", "PartyId") VALUES ('So much fun. Going back next year!', '2019-02-12 12:26:35', 'Pain dont hurt', 1);
INSERT INTO "Comments" ("Body", "CreatedAt", "Flair", "PartyId") VALUES ('Terrible, no food and no drinks!', '2018-03-05 11:54:12', 'Its 5 Oclock somehwere', 2);
INSERT INTO "Comments" ("Body", "CreatedAt", "Flair", "PartyId") VALUES ('Dogs were everywhere, it was so much fun! I love this tailgate', '2020-03-09 12:23:55', 'Mans best friend', 3);
INSERT INTO "Comments" ("Body", "CreatedAt", "Flair", "PartyId") VALUES ('Heaven for Dogs. Friendly people and food everywhere', '2020-05-02 09:45:25','Bring a leash', 3);